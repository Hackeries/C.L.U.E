from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.conf import settings
from django.core.mail import EmailMessage
from django.utils import timezone
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from .models import Coordinator, PasswordReset  # explicitly import models used
from .models import *  # if you have many local models; consider listing explicitly
import re


def _send_verification_email(request, user: User) -> None:
    """
    Build and send an email verification link. Uses DEFAULT_FROM_EMAIL if set,
    fails silently to avoid raising errors on email send in production.
    """
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)
    verify_url = request.build_absolute_uri(
        reverse('verify-email', kwargs={'uidb64': uid, 'token': token})
    )
    subject = 'Verify your email - C.L.U.E'
    body = (
        f'Hi {user.first_name or user.username},\n\n'
        f'Please verify your email by clicking the link below:\n{verify_url}\n\n'
        'If you did not request this, ignore this email.'
    )
    from_email = getattr(settings, "DEFAULT_FROM_EMAIL", settings.EMAIL_HOST_USER)
    email_message = EmailMessage(subject, body, from_email, [user.email])
    email_message.fail_silently = True
    try:
        email_message.send()
    except Exception:
        # fail silently, but you can log the exception if you want
        pass


def RegisterView(request):
    """
    Register a new user. Restrict to @banasthali.in emails only.
    New users are created with is_active=False and sent a verification email.
    """
    if request.method == "POST":
        first_name = request.POST.get('first_name', '').strip()
        last_name = request.POST.get('last_name', '').strip()
        username = request.POST.get('username', '').strip()
        email = request.POST.get('email', '').strip().lower()
        password = request.POST.get('password', '')

        errors = []

        # Only allow @banasthali.in emails
        if not re.match(r'^[A-Za-z0-9._%+-]+@banasthali\.in$', email):
            errors.append("Only @banasthali.in emails are allowed for registration.")

        if User.objects.filter(username=username).exists():
            errors.append("Username already exists.")

        if User.objects.filter(email=email).exists():
            errors.append("Email already exists.")

        if len(password) < 5:
            errors.append("Password must be at least 5 characters.")

        if errors:
            return render(request, 'signup_page.html', {
                'errors': errors,
                'first_name': first_name,
                'last_name': last_name,
                'username': username,
                'email': email
            })

        # create user and send verification mail
        new_user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            email=email,
            username=username,
            password=password
        )
        new_user.is_active = False
        new_user.save()
        _send_verification_email(request, new_user)
        return render(request, 'email_verification_sent.html', {'email': email})

    return render(request, 'signup_page.html')


def VerifyEmail(request, uidb64: str, token: str):
    """
    Verify the user using the token from the verification email.
    """
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except Exception:
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save(update_fields=["is_active"])
        messages.success(request, "Email verified. You can now log in.")
        return render(request, 'email_verified.html')
    else:
        messages.error(request, "Verification link is invalid or expired.")
        return render(request, 'email_verified.html', {"error": True})


def LoginView(request):
    """
    Handle user login. Implements 'remember me' via session expiry:
    - if remember_me is checked -> keep for SESSION_COOKIE_AGE
    - otherwise -> expire on browser close
    """
    if request.method == "POST":
        username = request.POST.get("username", "").strip()
        password = request.POST.get("password", "")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            if not user.is_active:
                messages.error(request, "Please verify your email before logging in.")
                return redirect('login')

            login(request, user)

            remember_me = request.POST.get("remember_me")
            if remember_me:
                # Keep the session the configured length (default 2 weeks, or from settings)
                request.session.set_expiry(getattr(settings, "SESSION_COOKIE_AGE", 60 * 60 * 24 * 14))
            else:
                # Expire the session on browser close
                request.session.set_expiry(0)

            return redirect('profile')

        messages.error(request, "Invalid login credentials")
        return redirect('login')

    return render(request, 'login_page.html')


def LogoutView(request):
    """
    Logout and clear session.
    """
    request.session.flush()
    logout(request)
    return redirect('login')


def ForgotPassword(request):
    """
    Request a password reset link. Creates a PasswordReset entry (model) and emails the reset link.
    """
    if request.method == "POST":
        email = request.POST.get('email', '').strip().lower()

        try:
            user = User.objects.get(email=email)

            new_password_reset = PasswordReset(user=user)
            new_password_reset.save()

            password_reset_url = reverse('reset-password', kwargs={'reset_id': new_password_reset.reset_id})
            full_password_reset_url = f'{request.scheme}://{request.get_host()}{password_reset_url}'

            email_body = f'Reset your password using the link below:\n\n{full_password_reset_url}'
            from_email = getattr(settings, "DEFAULT_FROM_EMAIL", settings.EMAIL_HOST_USER)

            email_message = EmailMessage(
                'Reset your password',
                email_body,
                from_email,
                [email]
            )
            email_message.fail_silently = True
            try:
                email_message.send()
            except Exception:
                pass

            return redirect('password-reset-sent', reset_id=new_password_reset.reset_id)

        except User.DoesNotExist:
            messages.error(request, f"No user with email '{email}' found")
            return redirect('forgot-password')

    return render(request, 'forgot_password.html')


def PasswordResetSent(request, reset_id):
    if PasswordReset.objects.filter(reset_id=reset_id).exists():
        return render(request, 'password_reset_sent.html')
    messages.error(request, 'Invalid reset id')
    return redirect('forgot-password')


def ResetPassword(request, reset_id):
    """
    Handle password reset using a PasswordReset object.
    Expires after 10 minutes from creation.
    """
    try:
        password_reset_obj = PasswordReset.objects.get(reset_id=reset_id)

        if request.method == "POST":
            password = request.POST.get('password', '')
            confirm_password = request.POST.get('confirm_password', '')

            passwords_have_error = False

            if password != confirm_password:
                passwords_have_error = True
                messages.error(request, 'Passwords do not match')

            if len(password) < 5:
                passwords_have_error = True
                messages.error(request, 'Password must be at least 5 characters long')

            expiration_time = password_reset_obj.created_when + timezone.timedelta(minutes=10)
            if timezone.now() > expiration_time:
                passwords_have_error = True
                messages.error(request, 'Reset link has expired')
                password_reset_obj.delete()

            if not passwords_have_error:
                user = password_reset_obj.user
                user.set_password(password)
                user.save()
                password_reset_obj.delete()
                messages.success(request, 'Password reset. Proceed to login')
                return redirect('login')
            return redirect('reset-password', reset_id=reset_id)

    except PasswordReset.DoesNotExist:
        messages.error(request, 'Invalid reset id')
        return redirect('forgot-password')

    return render(request, 'reset_password.html')


@login_required
def profile(request):
    """
    Show profile page. If the user is a coordinator (club/department), redirect to coordinator dashboard.
    """
    user = request.user

    # check coordinator related to user
    coordinator = None
    try:
        # if your Coordinator model uses a OneToOneField to User as `user`, adjust accordingly
        coordinator = Coordinator.objects.filter(user=user).first()
    except Exception:
        # fallback: try to check by username (older implementations)
        coordinator = Coordinator.objects.filter(coordinator_name=user.username).first()

    if coordinator:
        # redirect to appropriate coordinator dashboard
        if coordinator.coordinator_type == 'department':
            return redirect('coordinator_dashboard_dept')  # adjust name if different
        else:
            return redirect('coordinator_dashboard')

    # default profile for normal users
    return render(request, "profile.html", {"user": user})


def home(request):
    """
    A simple home view that can display coordinator name if stored in session.
    """
    return render(request, "index.html", {
        "coordinator_name": request.session.get('coordinator_name', None)
    })


def coordinator_view(request):
    """
    Coordinator login using Coordinator model (legacy/plaintext password).
    Consider migrating coordinators to use Django auth for security.
    """
    if request.method == "POST":
        coordinator_name = request.POST.get("username", "").strip()
        password = request.POST.get("password", "")

        try:
            coordinator = Coordinator.objects.get(coordinator_name=coordinator_name, password=password)

            request.session['coordinator_name'] = coordinator.coordinator_name
            request.session['email'] = coordinator.email
            request.session['coordinator_type'] = coordinator.coordinator_type

            # Redirect based on coordinator type
            if coordinator.coordinator_type == 'department':
                return redirect('coordinator_dashboard_dept')
            else:
                return redirect('coordinator_dashboard')

        except Coordinator.DoesNotExist:
            messages.error(request, "Invalid login credentials")
            return redirect('coordinator_login')

    return render(request, 'coordinator_login.html')


def coordinator_dashboard(request):
    """
    Displays coordinator stats for department or club.
    Requires that coordinator_name is in session.
    """
    if 'coordinator_name' not in request.session:
        return redirect('coordinator_login')

    coordinator_name = request.session['coordinator_name']
    email = request.session.get('email', None)

    try:
        coordinator = Coordinator.objects.get(coordinator_name=coordinator_name)
    except Coordinator.DoesNotExist:
        return redirect('coordinator_login')

    from event.models import Event, Notice
    from department.models import dEvent
    from django.utils.timezone import now as tz_now

    context = {'coordinator_name': coordinator_name, 'email': email}

    if coordinator.coordinator_type == 'department' and coordinator.department_name:
        total_events = dEvent.objects.filter(department_name=coordinator.department_name).count()
        upcoming_events = dEvent.objects.filter(department_name=coordinator.department_name, event_start_date__gte=tz_now()).count()
        notices_count = Notice.objects.filter(department_name=coordinator.department_name).count()
        context.update({
            'total_events': total_events,
            'upcoming_events': upcoming_events,
            'notices_count': notices_count,
        })
        return render(request, 'coordinator_dept_dashboard.html', context)

    # club coordinator case
    total_events = Event.objects.filter(club_name=coordinator.club_name).count() if coordinator.club_name else 0
    upcoming_events = Event.objects.filter(club_name=coordinator.club_name, event_start_date__gte=tz_now()).count() if coordinator.club_name else 0
    notices_count = Notice.objects.filter(club_name=coordinator.club_name).count() if coordinator.club_name else 0
    context.update({
        'total_events': total_events,
        'upcoming_events': upcoming_events,
        'notices_count': notices_count,
    })
    return render(request, 'coordinator_dashboard.html', context)

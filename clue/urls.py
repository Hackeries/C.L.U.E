from django.contrib import admin
from django.urls import path, include  # ✅ Include is necessary
from django.conf import settings
from django.conf.urls.static import static
from home import views as home_views

urlpatterns = [
    path('admin/', admin.site.urls),
    # Root path -> home page
    path('', home_views.home, name='root'),
    path('', include('signup.urls')),  
    path('home/', include('home.urls')),  
    path('event/', include('event.urls')),
    path('department/', include('department.urls')),
    path('admin_handling/', include('admin_handling.urls')),
    path('api/', include('api.urls')),  # ✅ Keep this unified API route
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

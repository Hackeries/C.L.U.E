from django import template

register = template.Library()


@register.filter(name='mul')
def multiply(value, arg):
    """
    Multiplies the value by the argument.
    Usage: {{ value|mul:arg }}
    Example: {{ 5|mul:10 }} returns 50
    """
    try:
        return int(value) * int(arg)
    except (ValueError, TypeError):
        return 0

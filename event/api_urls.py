from rest_framework.routers import DefaultRouter
from .api import DepartmentViewSet, ClubViewSet, EventViewSet, NoticeViewSet

router = DefaultRouter()
router.register(r"departments", DepartmentViewSet, basename="department")
router.register(r"clubs", ClubViewSet, basename="club")
router.register(r"events", EventViewSet, basename="event")
router.register(r"notices", NoticeViewSet, basename="notice")

urlpatterns = router.urls

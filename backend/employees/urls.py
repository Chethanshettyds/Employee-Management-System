from rest_framework.routers import SimpleRouter  # Changed from DefaultRouter

router = SimpleRouter()
# ... rest stays the same

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet

router = SimpleRouter()
router.register(r'', EmployeeViewSet)

urlpatterns = router.urls
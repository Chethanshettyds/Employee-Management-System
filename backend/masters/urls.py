from django.urls import path
from rest_framework.routers import SimpleRouter
from .views import (
    CompanyViewSet, DepartmentViewSet, DesignationViewSet,
    LocationViewSet, EmployeeTypeViewSet
)

router = SimpleRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'designations', DesignationViewSet)
router.register(r'locations', LocationViewSet)
router.register(r'employee-types', EmployeeTypeViewSet)

urlpatterns = router.urls

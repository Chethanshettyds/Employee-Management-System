from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count, Q
from .models import Employee
from .serializers import (
    EmployeeListSerializer, EmployeeDetailSerializer, 
    EmployeeCreateUpdateSerializer
)

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.select_related(
        'company', 'department', 'designation', 'location', 'employee_type'
    ).all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['company', 'department', 'designation', 'location', 'employee_type', 'gender', 'is_active']
    search_fields = ['employee_id', 'first_name', 'last_name', 'email', 'phone']
    ordering_fields = ['employee_id', 'first_name', 'date_of_joining', 'created_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return EmployeeListSerializer
        elif self.action == 'retrieve':
            return EmployeeDetailSerializer
        return EmployeeCreateUpdateSerializer

    @action(detail=False, methods=['get'])
    def dashboard_stats(self, request):
        stats = {
            'total_employees': Employee.objects.filter(is_active=True).count(),
            'male_employees': Employee.objects.filter(is_active=True, gender='M').count(),
            'female_employees': Employee.objects.filter(is_active=True, gender='F').count(),
            'permanent_employees': Employee.objects.filter(
                is_active=True, 
                employee_type__name='PERMANENT'
            ).count(),
            'temporary_employees': Employee.objects.filter(
                is_active=True, 
                employee_type__name='TEMPORARY'
            ).count(),
            'contract_employees': Employee.objects.filter(
                is_active=True, 
                employee_type__name='CONTRACT'
            ).count(),
            'intern_employees': Employee.objects.filter(
                is_active=True, 
                employee_type__name='INTERN'
            ).count(),
            'department_wise': list(
                Employee.objects.filter(is_active=True)
                .values('department__name')
                .annotate(count=Count('id'))
                .order_by('-count')
            ),
            'company_wise': list(
                Employee.objects.filter(is_active=True)
                .values('company__name')
                .annotate(count=Count('id'))
                .order_by('-count')
            ),
        }
        return Response(stats)

    @action(detail=False, methods=['get'])
    def export_data(self, request):
        employees = self.filter_queryset(self.get_queryset())
        serializer = EmployeeListSerializer(employees, many=True)
        return Response(serializer.data)
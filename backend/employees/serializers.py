from rest_framework import serializers
from .models import Employee
from masters.serializers import (
    CompanySerializer, DepartmentSerializer, DesignationSerializer,
    LocationSerializer, EmployeeTypeSerializer
)

class EmployeeListSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    designation_title = serializers.CharField(source='designation.title', read_only=True)
    location_name = serializers.CharField(source='location.name', read_only=True)
    employee_type_name = serializers.CharField(source='employee_type.get_name_display', read_only=True)
    full_name = serializers.CharField(read_only=True)
    
    class Meta:
        model = Employee
        fields = [
            'id', 'employee_id', 'first_name', 'last_name', 'full_name',
            'email', 'phone', 'gender', 'company_name', 'department_name',
            'designation_title', 'location_name', 'employee_type_name',
            'date_of_joining', 'is_active', 'profile_image'
        ]

class EmployeeDetailSerializer(serializers.ModelSerializer):
    company_details = CompanySerializer(source='company', read_only=True)
    department_details = DepartmentSerializer(source='department', read_only=True)
    designation_details = DesignationSerializer(source='designation', read_only=True)
    location_details = LocationSerializer(source='location', read_only=True)
    employee_type_details = EmployeeTypeSerializer(source='employee_type', read_only=True)
    
    class Meta:
        model = Employee
        fields = '__all__'

class EmployeeCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
    
    def validate_employee_id(self, value):
        if self.instance:
            if Employee.objects.exclude(pk=self.instance.pk).filter(employee_id=value).exists():
                raise serializers.ValidationError("Employee ID already exists.")
        else:
            if Employee.objects.filter(employee_id=value).exists():
                raise serializers.ValidationError("Employee ID already exists.")
        return value
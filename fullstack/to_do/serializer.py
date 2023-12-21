from rest_framework import serializers
from .models import TodoTable

# class serializer that takes all values from databes


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoTable           # serializer works with model TodoTable                  
        fields = "__all__"          # returns all field                

# class serializer that takes only "id" and "checked" from databes


class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoTable                              
        fields = "id", "checked"    # returns only "id", "checked"

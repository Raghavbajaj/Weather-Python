from rest_framework import serializers
from .models import Weatherapp

class WeatherAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weatherapp
        fields = ('id','place','temperature','about')
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import WeatherAppSerializer
from .models import Weatherapp

# Create your views here.

class WeatherAppView(viewsets.ModelViewSet):
    serializer_class = WeatherAppSerializer
    queryset = Weatherapp.objects.all()
from django.contrib import admin
from .models import Weatherapp

class WeatherappAdmin(admin.ModelAdmin):
    list_display = ('place','temperature','about')

# Register your models here.

admin.site.register(Weatherapp, WeatherappAdmin)

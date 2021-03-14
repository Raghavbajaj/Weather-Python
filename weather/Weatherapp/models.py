from django.db import models

# Create your models here.

class Weatherapp(models.Model):
    place = models.CharField(max_length=120)
    temperature=models.IntegerField()
    about = models.TextField()

    def __str__(self):
        return self.place
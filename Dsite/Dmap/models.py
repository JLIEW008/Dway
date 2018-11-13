from django.db import models


# Create your models here.


# class UserLastLocation(models.Model):
	# user = models.ForeignKey()

class PictureLocation(models.Model):
	url = models.CharField(max_length=200)
	name = models.CharField(max_length=200)
	lat = models.FloatField(max_length=200)
	lng = models.FloatField(max_length=200)


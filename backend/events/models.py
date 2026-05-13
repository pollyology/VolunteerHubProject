import uuid
from django.db import models

# Create your models here.
class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()

    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    
    location_address = models.TextField()
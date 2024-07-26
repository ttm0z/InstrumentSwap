
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import ApiUser

@receiver(post_save, sender=User)
def create_api_user(sender, instance, created, **kwargs):
    print("signal called")
    if created:
        print("instance:", instance)
        ApiUser.objects.create(username=instance)

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from api.models import User  # Import your ApiUser model

@receiver(post_save, sender=User)
def create_api_user(sender, instance, created, **kwargs):
    if created:
        # Create a corresponding entry in ApiUser when a new User is created
        User.objects.create(user=instance)
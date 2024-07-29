# accounts/backends.py

from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist

User = get_user_model()

class CustomBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            print("custom backend entered")
            user = User.objects.get(username=username)
            print(user)
            if user.check_password(password):
                return user
        except ObjectDoesNotExist:
            print("object dne")
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

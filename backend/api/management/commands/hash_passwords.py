from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

class Command(BaseCommand):
    help = 'Hash passwords for existing users'

    def handle(self, *args, **kwargs):
        User = get_user_model()  # Get the custom user model
        users = User.objects.all()
        for user in users:
            if not user.password.startswith(('pbkdf2_sha256$', 'bcrypt', 'argon2', 'sha1')):
                # This check is to ensure the password is not already hashed
                user.password = make_password(user.password)
                user.save()
                self.stdout.write(self.style.SUCCESS(f'Updated password for user: {user.username}'))

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class ApiUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not username:
            raise ValueError('The Username field must be set')
        
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, email, password, **extra_fields)

class ApiUser(AbstractBaseUser):
    
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True, blank=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    location = models.CharField(max_length=100, blank=True)
    profile_picture = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    buy_history = models.ManyToManyField('Transaction', related_name='buy_history')
    sell_history = models.ManyToManyField('Transaction', related_name='sell_history')
    listings = models.ManyToManyField('Listing', related_name='listings')


    objects = ApiUserManager()

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username

class Listing(models.Model):
    listing_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(ApiUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=50)
    condition = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    swap = models.BooleanField(default=False)
    images = models.JSONField()  # Using JSONField to store list of URLs
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    location = models.CharField(max_length=100)
    status = models.CharField(max_length=50, default='active')

    def __str__(self):
        return self.title

class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    buyer = models.ForeignKey(ApiUser, related_name='buyer', on_delete=models.CASCADE)
    seller = models.ForeignKey(ApiUser, related_name='seller', on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Transaction {self.transaction_id}"

class Message(models.Model):
    message_id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(ApiUser, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(ApiUser, related_name='received_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    listing = models.ForeignKey(Listing, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"Message from {self.sender} to {self.receiver}"

class SearchHistory(models.Model):
    search_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(ApiUser, on_delete=models.CASCADE)
    search_query = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    results_count = models.IntegerField()

    def __str__(self):
        return f"Search by {self.user} on {self.timestamp}"

class Appraisal(models.Model):
    appraisal_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(ApiUser, on_delete=models.CASCADE)
    item_details = models.TextField()
    images = models.JSONField()  # Using JSONField to store list of URLs
    estimated_value = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Appraisal for {self.user}"
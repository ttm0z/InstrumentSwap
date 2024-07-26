# Generated by Django 5.0.7 on 2024-07-26 01:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ApiUser',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=50, unique=True)),
                ('email', models.EmailField(blank=True, max_length=254, unique=True)),
                ('first_name', models.CharField(blank=True, max_length=50)),
                ('last_name', models.CharField(blank=True, max_length=50)),
                ('location', models.CharField(blank=True, max_length=100)),
                ('profile_picture', models.URLField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Appraisal',
            fields=[
                ('appraisal_id', models.AutoField(primary_key=True, serialize=False)),
                ('item_details', models.TextField()),
                ('images', models.JSONField()),
                ('estimated_value', models.CharField(max_length=50)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.apiuser')),
            ],
        ),
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('listing_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('category', models.CharField(max_length=50)),
                ('condition', models.CharField(max_length=50)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('swap', models.BooleanField(default=False)),
                ('images', models.JSONField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('location', models.CharField(max_length=100)),
                ('status', models.CharField(default='active', max_length=50)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.apiuser')),
            ],
        ),
        migrations.AddField(
            model_name='apiuser',
            name='listings',
            field=models.ManyToManyField(related_name='listings', to='api.listing'),
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('message_id', models.AutoField(primary_key=True, serialize=False)),
                ('content', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('listing', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.listing')),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_messages', to='api.apiuser')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_messages', to='api.apiuser')),
            ],
        ),
        migrations.CreateModel(
            name='SearchHistory',
            fields=[
                ('search_id', models.AutoField(primary_key=True, serialize=False)),
                ('search_query', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('results_count', models.IntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.apiuser')),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('transaction_id', models.AutoField(primary_key=True, serialize=False)),
                ('transaction_type', models.CharField(max_length=50)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('status', models.CharField(default='pending', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('buyer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='buyer', to='api.apiuser')),
                ('listing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.listing')),
                ('seller', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='seller', to='api.apiuser')),
            ],
        ),
        migrations.AddField(
            model_name='apiuser',
            name='buy_history',
            field=models.ManyToManyField(related_name='buy_history', to='api.transaction'),
        ),
        migrations.AddField(
            model_name='apiuser',
            name='sell_history',
            field=models.ManyToManyField(related_name='sell_history', to='api.transaction'),
        ),
    ]

# Generated by Django 5.0.7 on 2024-07-25 23:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_remove_apiuser_buy_history_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='apiuser',
            name='buy_history',
            field=models.ManyToManyField(related_name='buy_history', to='api.transaction'),
        ),
        migrations.AddField(
            model_name='apiuser',
            name='email',
            field=models.EmailField(blank=True, max_length=254, unique=True),
        ),
        migrations.AddField(
            model_name='apiuser',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
        migrations.AddField(
            model_name='apiuser',
            name='password',
            field=models.CharField(default=1, max_length=128, verbose_name='password'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='apiuser',
            name='sell_history',
            field=models.ManyToManyField(related_name='sell_history', to='api.transaction'),
        ),
        migrations.AddField(
            model_name='apiuser',
            name='user_id',
            field=models.AutoField(default=1, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='apiuser',
            name='profile_picture',
            field=models.URLField(blank=True, default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='apiuser',
            name='username',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='appraisal',
            name='estimated_value',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='appraisal',
            name='images',
            field=models.JSONField(),
        ),
        migrations.AlterField(
            model_name='appraisal',
            name='item_details',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='listing',
            name='category',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='listing',
            name='condition',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='listing',
            name='description',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='listing',
            name='images',
            field=models.JSONField(default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='listing',
            name='location',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='listing',
            name='price',
            field=models.DecimalField(decimal_places=2, default=1, max_digits=10),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='listing',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.apiuser'),
        ),
        migrations.AlterField(
            model_name='message',
            name='listing',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.listing'),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='buyer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='buyer', to='api.apiuser'),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='price',
            field=models.DecimalField(decimal_places=2, default=1, max_digits=10),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='transaction',
            name='seller',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='seller', to='api.apiuser'),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='transaction_type',
            field=models.CharField(max_length=50),
        ),
    ]

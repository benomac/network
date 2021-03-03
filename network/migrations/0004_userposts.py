# Generated by Django 3.1.4 on 2021-03-03 19:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0003_user_followed'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPosts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post', models.CharField(max_length=280)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('likes', models.IntegerField(default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='poster', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

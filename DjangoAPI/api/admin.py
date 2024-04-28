from django.contrib import admin

from .models import post,UserData

admin.site.register(UserData)
admin.site.register(post)
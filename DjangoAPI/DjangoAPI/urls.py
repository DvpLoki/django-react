from django.contrib import admin
from django.urls import path,include
from api.urls import urls
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = format_suffix_patterns([
    path('admin/', admin.site.urls),
    path('',include(urls)),
])

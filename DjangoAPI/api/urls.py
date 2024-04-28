from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urls=[
    path('',views.api_root),


    path('register',views.register,name="register"),

    path('login',TokenObtainPairView.as_view()),
    path('login/refresh',TokenRefreshView.as_view()),


    path('posts',views.post_list.as_view(),name='posts'),
    path('posts/<int:pk>',views.post_detail.as_view(),name='post'),

    path('users', views.user_list.as_view(),name='users'),
    path('users/<int:pk>', views.user_detail.as_view(),name='user'),
    path('me',views.current_user,name="me")
   
]
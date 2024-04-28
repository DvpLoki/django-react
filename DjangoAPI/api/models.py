from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser,PermissionsMixin


class UserManager(BaseUserManager):
    use_in_migrations=True

    def create_user(self,email,password=None,**extra_fields):
        if not email:
            raise ValueError('email is required')
        
        user=self.model(email=self.normalize_email(email),**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,email,password,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        extra_fields.setdefault('is_active',True)
        extra_fields.setdefault('is_admin',True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('superuser must have is_staff=true')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('superuser must have is_superuser=true')
        
        return self.create_user(email,password,**extra_fields)
    

class UserData(AbstractBaseUser,PermissionsMixin):
    username=None
    name=models.CharField(max_length=100,unique=True)
    email=models.EmailField(max_length=100,unique=True)
    date_joined=models.DateTimeField(auto_now_add=True)
    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)
    is_admin=models.BooleanField(default=False)

    objects=UserManager()

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['name']    

    def __str__(self):
        return self.name


class post(models.Model):
    title=models.TextField(null=False)
    content=models.TextField(null=False)
    created_at=models.DateTimeField(auto_now_add=True)

    owner = models.ForeignKey('UserData', related_name='posts', on_delete=models.CASCADE)

    def __str__(self):
        return self.title




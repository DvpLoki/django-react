from rest_framework import serializers
from .models import post,UserData


class userDataSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    date_joined=serializers.ReadOnlyField()
    class Meta:
        model = UserData
        fields = ['id', 'name', 'date_joined','email','password']

    def create(self, validated_data):
        user=UserData.objects.create(**validated_data)

        user.set_password(validated_data['password'])
        user.save()
        return user  

class postserializer(serializers.ModelSerializer):
    owner = userDataSerializer(read_only=True)
    id=serializers.ReadOnlyField()
    created_at=serializers.ReadOnlyField()
    class Meta:
        model=post
        fields=['id','title','content','created_at','owner']

from .models import post,UserData
from .serializers import postserializer,userDataSerializer

from rest_framework import generics,permissions,status
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('users', request=request, format=format),
        'posts': reverse('posts', request=request, format=format)
    })

@api_view(['POST'])
def register(request,format=None):
    serializer=userDataSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request,format=None):
    try:
        user=UserData.objects.get(id=get_user_id_from_token(request))
        return Response(userDataSerializer(user).data,status=200)
    except user.DoesNotExist:
        return Http404("invalid user ")

class post_list(generics.ListCreateAPIView):
    queryset = post.objects.all()
    serializer_class = postserializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class post_detail(APIView):
    serializer_class = postserializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]

    def get_object(self,pk):
        try:
            return post.objects.get(pk=pk)
        except post.DoesNotExist:
            raise Http404
        
    def get(self,request,pk,format=None):
        post=self.get_object(pk) 
        serializer=self.serializer_class(post)
        return Response(serializer.data)
    
    def put(self,request,pk,format=None):
        posts=self.get_object(pk)
        userid= get_user_id_from_token(request)
        if posts.owner.id!=userid:
                return Response({"msg":"request Not allowed"},status=status.HTTP_403_FORBIDDEN)
        serializer=self.serializer_class(posts,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk,format=None):
        posts=self.get_object(pk)
    
        if posts.owner.id != get_user_id_from_token(request):
            return Response({"msg":"request Not allowed  "},status=status.HTTP_403_FORBIDDEN)
        posts.delete()
        return Response(status=status.HTTP_404_NOT_FOUND)





class user_list(generics.ListAPIView):
    queryset =UserData.objects.filter(is_superuser=False,is_admin=False)
    serializer_class = userDataSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]

class user_detail(generics.RetrieveAPIView):
    queryset =UserData.objects.filter(is_superuser=False,is_admin=False)
    serializer_class = userDataSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]





def get_user_id_from_token(request):
    authorization_header = request.headers.get('Authorization')
    if authorization_header:
        token = authorization_header.split(' ')[1]  
        try:
            access_token = AccessToken(token)
            user_id = access_token['user_id']  
            return user_id
        except Exception as e:
            pass 
    return None


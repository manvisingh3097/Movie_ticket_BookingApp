from django.shortcuts import render
from rest_framework.views import APIView
import json
from .serializers import *
from rest_framework.response import Response

# Create your views here.

class UserView(APIView):
    def post(self, request):
        print(request.data)
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account created succesfully"} , status=201)
        return Response(serializer.errors , status=400)
    
    def get(self, request):
        #
        uname = request.GET.get("username" , None)
        users_list = User.objects.all()
        userdetail = users_list.filter(username__iexact=uname)
        return Response(userdetail.values() , status=201)
    
    def put(self, request):
        uname = request.data["username"]

        return Response(uname , status=200)
    
class MovieView(APIView):
    def get(self, request):
        movie_list = Movie.objects.all().values()
        return Response(movie_list , status=200)
    
    def post(self, request):
        pass

    

    







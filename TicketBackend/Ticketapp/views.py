from django.shortcuts import render
from rest_framework.views import APIView
import json
from .serializers import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , IsAdminUser


# Create your views here.

class UserView(APIView):
    def post(self, request):
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
        userdetail = User.objects.get(username__iexact=uname)
        serializer = UserSerializer(userdetail,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account updated succesfully"} , status=201)
        return Response(serializer.errors , status=400)
        
    
    def delete(self,request):
        userdetail = User.objects.get(username=request.data["username"])
        userdetail.delete()
        return Response(status=204)
    
class MovieView(APIView):
#for admin only 
    def get_permissions(self):
        if self.request.method in ["POST", "PUT" , "DELETE"]:
            return [IsAuthenticated(), IsAdminUser()]
        return[]

    def get(self, request):
        name = request.GET.get("name",None)
        genre = request.GET.get("genre",None)
        language = request.GET.get("language",None)
        location = request.GET.get("location",None)
        movie_list = Movie.objects.all()

        if name:
            movie_list = movie_list.filter(moviename=name)

        if genre:
            movie_list = movie_list.filter(genre=genre)

        if language:
            movie_list = movie_list.filter(language=language)
        
        if location:
            movie_list = movie_list.filter(location=location)

        movie_list = movie_list.values()
        return Response(movie_list , status=200)
    
    def post(self, request):
        #permission = isuthenticated()

        serializer = MovieSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Movie added succesfully"} , status=201)
        return Response(serializer.errors , status=400)
    
    def put(self, request): 
        mname = request.data["moviename"]
        moviedetail = Movie.objects.get(moviename__iexact=mname)
        serializer = MovieSerializer(moviedetail, data= request.data , partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response({"Movie updated succesfully" } , status=201) 
        return Response(serializer.errors, status=400)
    
    def delete(self , request) : 
        moviedetail = Movie.objects.get(moviename= request.data["moviename"])
        moviedetail.delete()
        return Response({"message: movie deleted succesfully"} , status=204)



class TicketView(APIView):
    def get(self, request):
        utickets = request.GET.get("username" , None)

    def post(self,request):
        serializer = TicketSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Ticket Booked succesfully"} , status=201)
        return Response(serializer.errors , status=400)
    

class TheaterView(APIView):
    def get(self, request):
        movie_name = request.Get.get("movie_name" , None)
        theater_list = Theater.objects.get(movie__iexact=movie_name)
        return Response(theater_list.values(),status=200)

    def post(self, request):
        serializer = TheaterSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Theater added succesfully"} , status=201)
        return Response(serializer.errors , status=400)
        


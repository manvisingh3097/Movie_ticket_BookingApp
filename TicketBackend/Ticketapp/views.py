from django.shortcuts import render
from rest_framework.views import APIView
import json
from .serializers import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from django.db.models import Q
import jwt


# Create your views here.

class UserView(APIView):
    def post(self, request):
        #signup
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account created succesfully"} , status=201)
        print(serializer.errors)
        return Response(serializer.errors , status=400)
    
    def get(self, request):
        #signin
        uname = request.GET.get("username" , None)
        passw = request.GET.get("password" , None)
        users_list = User.objects.all()
        
        try:
            userdetail = users_list.filter(username__iexact=uname).values("username","password","id")[0]
        except:
            return Response({"message":"username not found"},400)
        print(userdetail)
        if userdetail["username"] == uname and userdetail["password"]==passw:
            #generate jwt
            encode_jwt = jwt.encode({"username":uname},'secret',algorithm='HS256')
            return Response({"message":"Login sucessfull","jwt":encode_jwt,"userid":userdetail["id"]},200)
        else:
            return Response({"message":"username,password did not match"},400)

    

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
        username = request.GET.get("username" , None)
        theatername = request.GET.get("theater_name" , None)
        tickets_list=[]
        if username:
            tickets_list = Ticket.objects.filter(user__username=username)
        if theatername:
            tickets_list = Ticket.objects.filter(theater__theater_name=theatername)

        return Response(tickets_list.values(),200)


    def post(self,request):
        print(request.data)
        serializer = TicketSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Ticket Booked succesfully"} , status=201)
        print(serializer.errors)
        return Response(serializer.errors , status=400)
    

class TheaterView(APIView):
    def get(self, request):
        movie_name = request.GET.get("moviename",None)
        theatername = request.GET.get("theatername",None)
        movie_time = request.GET.get("movietime",None)

        if (movie_name):
            theater_list = Theater.objects.filter(movie__moviename=movie_name).values()
        elif (theatername and movie_time):
            query = Q(theater_name=theatername) & Q(movie_time=movie_time)
            theater_list = Theater.objects.filter(query).values()

        else:
            theater_list= Theater.objects.all().values()
        
        return Response(theater_list,status=200)

    def post(self, request):
        serializer = TheaterSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Theater added succesfully"} , status=201)
        return Response(serializer.errors , status=400)
        
class SeatsView(APIView):
    def get(self,request):
        seats = []
        ticket_list=[]
        theatername = request.GET.get("theater",None)
        movie_time = request.GET.get("movietime",None)
        print(theatername)
        if theatername:
            query = Q(theater__theater_name=theatername) & Q(theater__movie_time=movie_time)
            ticket_list = Ticket.objects.filter(query ).values()
        else :
            ticket_list = Ticket.objects.all().values()
        for each in ticket_list:
            string_seats = each["seats"]
            list_seats  = string_seats.split(",")
            seats.extend(list_seats)
        return Response(seats,200)

class TicketgetView(APIView):
    def get(self,request):
        #we will expect theater id(i.e query paramater) in get request and will store in theaterid var
        theaterid = request.GET.get('theaterid', None)
        theater=[]
        if (theaterid):
            theater_list = Theater.objects.filter(id=theaterid).values()
            theater = theater_list[0]
            movie_id = theater["movie_id"]
            movie_detail = Movie.objects.filter(id=movie_id).values()
            moviename = movie_detail[0]["moviename"]
            theater["moviename"] = moviename
       
        return Response(theater,200)

        


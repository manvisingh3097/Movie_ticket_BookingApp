from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=32, unique=True)
    password = models.CharField(max_length=128)
    email = models.EmailField()
    mobile_num = models.IntegerField(max_length=15)

class Movie(models.Model):
    moviename = models.CharField(max_length=200, unique=True)
    rate_star = models.FloatField(default = 0)
    genre = models.CharField(max_length=100)
    language = models.CharField(max_length= 100)
    run_timing = models.IntegerField()
    date = models.DateField()
    image = models.URLField()

class Screen(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    time = models.DateTimeField()
    theater = models.CharField(max_length=100)
    seat_type = models.CharField(max_length=100)
    available_seats = models.IntegerField()

class Seats(models.Model):
    screen = models.ForeignKey(Screen, on_delete=models.CASCADE)
    seat_number = models.CharField(max_length=6)
    row = models.CharField(max_length=10)
    seat_type = models.CharField(max_length=50)
    seat_price = models.FloatField()
    available_seats_flag = models.BooleanField(default=True)

class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    price = models.FloatField()
    seats = models.ManyToManyField(Seats)
    

    


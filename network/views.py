import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from .forms import NewPostForm
from django.http import JsonResponse
from django.core import serializers
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from .models import User, UserPosts, Following


def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

def new_post(request):
    if request.method == "POST":
        user = request.user
        form = NewPostForm(request.POST)
        if form.is_valid():
            # Get data from form
            # Argument in [] HAS to be form element name!!
            post = form.cleaned_data["post"]
            new_post = UserPosts.objects.create(user=user, post=post)
            new_post.save()
            return render(request, "network/index.html", {
        "form":NewPostForm()
    })
        
    
    return render(request, "network/new_post.html", {
        "form":NewPostForm()
    })

def all_posts(request):
    # user = request.user
    posts = UserPosts.objects.all()
    
    posts = posts.order_by("-timestamp").all()
    
    return JsonResponse([post.serialize() for post in posts], safe=False)
    

@login_required()
def load_profile(request, user):
    user = User.objects.get(username=user)
    profile_content = UserPosts.objects.filter(user=user.id)
    add_id = [post.serialize() for post in profile_content]
    add_id.append({'user_id':user.id})
    return JsonResponse(add_id, safe=False)
    # return JsonResponse(all_cont, safe=False)


@login_required()
def get_foll(request, user):
    num_of_foll = User.objects.filter(username=user)
    return JsonResponse([foll.serialize() for foll in num_of_foll], safe=False)

@csrf_exempt
@login_required()
def following(request, to_follow):
    followed = User.objects.get(username=request.user)
    if request.method == "PUT":
        
        toFollow = User.objects.get(id=to_follow)
        
        try:
            following = Following.objects.get(user=request.user, following=toFollow)
            print("delete")

            followed.followed = followed.followed - 1
            followed.save()

            followers = User.objects.get(username=toFollow)
            followers.followers = followers.followers - 1
            followers.save()
            # following.user.following
            following.delete()


            return render(request, "network/index.html")
        except:
            #Add new follower to follower model
            new_follower = Following.objects.create(user=request.user, following=toFollow)
            new_follower.save()

            #Update the user who followed's follwed amount in User
            
            followed.followed = followed.followed + 1
            followed.save()

            #Update the user being followed's followers
            followers = User.objects.get(username=toFollow)
            followers.followers = followers.followers + 1
            followers.save()

            return HttpResponse(status=204)
    if request.method == "GET":
        followers = Following.objects.filter(user_id=request.user)
        follower_posts = []
        for follower in followers:
            follower_posts.append(UserPosts.objects.filter(user_id=follower.following_id))
        allp = []
        for i in follower_posts:
            i = i.order_by("-timestamp").all()
            for j in i:
                allp.append(j)
        
        return JsonResponse([foll.serialize() for foll in allp], safe=False)
    return None
  
def follow_or_un(request):
    is_following = Following.objects.filter(user_id=request.user)
    fol = [i.following.username for i in is_following]
    return JsonResponse(fol, safe=False)

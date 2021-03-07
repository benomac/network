from django.test import TestCase
from .models import User, UserPosts
# Create your tests here.

class UserPostsTest(TestCase):

    def setUp(self):
        # create post
        User.objects.create(password="tree", username="ben")
        User.objects.create(password="fence", username="dawn")

        usera = User.objects.get(pk=1)
        UserPosts.objects.create(user=usera, post="ben", timestamp="12.00")

        userb = User.objects.get(pk=2)
        UserPosts.objects.create(user=userb, post=1, timestamp="3.00")

    def test_post_content(self):
        a = UserPosts.objects.get(user=1)
        self.assertTrue(a.post.isalpha(), str)
        
    
    def test_post_Content(self):
        b = UserPosts.objects.get(user=2)
        self.assertTrue(b.post)
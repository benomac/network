from django import forms

class NewPostForm(forms.Form):
    post = forms.Charfield(label="New Post")
from django.db import models
from django.utils.text import slugify

class Blog(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    excerpt = models.TextField(blank=True)
    content = models.TextField()
    cover_image = models.ImageField(upload_to="blogs/", blank=True, null=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)[:200]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50)
    image = models.ImageField(upload_to='projects/')
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20)
    impact_numbers = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Report(models.Model):
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to="reports/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class GalleryImage(models.Model):
    title = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to="gallery/")
    caption = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class TeamMember(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to="team/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.role})"

class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    replied = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject or 'Contact'}"


class Donation(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Completed", "Completed"),
    ]

    donor = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    purpose = models.CharField(max_length=255)
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Pending")

    def __str__(self):
        return f"{self.donor} - {self.amount}"


class Volunteer(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Active", "Active"),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    area = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Pending")
    join_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name


class About(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.TextField(blank=True)
    mission = models.TextField()
    vision = models.TextField()
    story = models.TextField()
    image = models.ImageField(upload_to="about/", blank=True, null=True)
    values_intro = models.TextField(blank=True)
    values = models.JSONField(default=list)  # e.g. [{"title":"Integrity","description":"We ..."}]
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[
        ('new', 'New'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved')
    ], default='new')

class Gallery(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='gallery/')
    category = models.CharField(max_length=50, choices=[
        ('events', 'Events'),
        ('projects', 'Projects'),
        ('team', 'Team'),
        ('other', 'Other')
    ])
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Galleries"
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=200)
    image = models.ImageField(upload_to='events/', null=True, blank=True)
    status = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

class Impact(models.Model):
    title = models.CharField(max_length=200)
    number = models.IntegerField()
    description = models.TextField()
    icon = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(upload_to='testimonials/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Career(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    requirements = models.TextField()
    location = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    status = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

class Language(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=10)
    is_default = models.BooleanField(default=False)

class Translation(models.Model):
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    model_name = models.CharField(max_length=100)
    field_name = models.CharField(max_length=100)
    object_id = models.IntegerField()
    translated_text = models.TextField()

    class Meta:
        unique_together = ('language', 'model_name', 'field_name', 'object_id')

class Newsletter(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.email
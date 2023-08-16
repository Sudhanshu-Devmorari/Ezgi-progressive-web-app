

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_alter_user_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comments',
            name='commentator_user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.user'),
        ),
    ]

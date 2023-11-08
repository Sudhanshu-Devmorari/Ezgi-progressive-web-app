from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    # cron_classes = [
    #     'myapp.cron.MyCronJob',  # Replace 'myapp' with the actual app name
    # ]
    def ready(self):
        import core.signals

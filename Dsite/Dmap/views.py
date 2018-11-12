from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.views import generic

<<<<<<< HEAD
#from .models import Question, Choice

import googlemaps
from .ntu_map_search import *
=======
from .models import Question, Choice
from .ntu_map_search import *
import googlemaps
>>>>>>> 3bb0cd3da905fa9676cd51bfd60e9b4f52616be1

gmaps = googlemaps.Client(key="AIzaSyBOcaF80s4gu1xTbBxn7uRR9EU0ziTjhOs")


# from ntu_map_search import *
# Create your views here.
# def index(request):
# 	latest_question_list = Question.objects.order_by('-pub_date')[:5]
# 	output = ', '.join([q.question_text for q in latest_question_list])
# 	output += "Hi there :)"
# 	template = loader.get_template('polls/index.html')
# 	context = {
# 		'latest_question_list': latest_question_list
# 	}
# 	# return HttpResponse(template.render(context,request))
# 	return render(request, 'polls/index.html', context)
#
# def detail(request, question_id):
# 	# try:
# 	# 	question = Question.objects.get(pk=question_id)
# 	# except Question.DoesNotExist:
# 	# 	raise Http404("Question does not exist")
# 	question = get_object_or_404(Question, pk=question_id)
# 	return render(request, 'polls/detail.html', {'question': question})
# 	# return HttpResponse("You're looking at question %s." % question_id)
#
#
# def results(request, question_id):
#     question = get_object_or_404(Question, pk=question_id)
#     return render(request, 'polls/results.html', {'question': question})

def routeInfo(request):
<<<<<<< HEAD
    print(request.POST)
    if request.method == 'POST':
        if 'start' in request.POST and \
                'end' in request.POST and \
                'mode' in request.POST:
            start = request.POST['start']
            end = request.POST['end']
            mode = request.POST['mode']

            return search(start,end,mode)

            # Check if the route starts or end in NTU by coordinate

            # Perform normal search from start until it
            # reaches entrance of NTU

            # if the route start and end at NTU
            # perform ntu map search

            # to return directions..
            return HttpResponse('success')
        else:
            return HttpResponse('nope..')

    else:
        return HttpResponse('nope..')


def locInfo(request):
    print(request.POST)
    if request.method == 'POST':
        if 'lat' in request.POST and 'lng' in request.POST:
            # Todo: Save to server for the latest location

            # Todo: Return previous location if necessary

            return HttpResponse('Success')

        else:
            return HttpResponse('Failed')


def index(request):
    context = {'testing': 100}

    return render(request, 'Dmap/index.html', context)
=======
	print(request.POST)
	if request.method == 'POST':
		if 'start' in request.POST and \
				'end' in request.POST and \
				'mode' in request.POST:

			# Check if the route starts or end in NTU by coordinate
			start = request.POST['start'];
			end = request.POST['end'];
			mode = request.POST['mode'];
			locations = str(search(start, end, mode))
			print("HAHA")
			print(locations)
			return HttpResponse(locations)
			# Perform normal search from start until it
			# reaches entrance of NTU

			# if the route start and end at NTU
			# perform ntu map search
			# return HttpResponse(str(list))

			# to return directions..
			# return HttpResponse('success')
		else:
			return HttpResponse('nope..')

	else:
		return HttpResponse('nope..')


def locInfo(request):
	print(request.POST)
	if request.method == 'POST':
		if 'lat' in request.POST and 'lng' in request.POST:
			# Todo: Save to server for the latest location

			# Todo: Return previous location if necessary
			print("Hahahahahah")
			return HttpResponse('Success')
		else:
			return HttpResponse('Failed')


def index(request):
	context = {'testing': 100}

	return render(request, 'Dmap/index.html', context)
>>>>>>> 3bb0cd3da905fa9676cd51bfd60e9b4f52616be1


# context = {
# 		'latest_question_list': latest_question_list
# 	}

# def index(request):
# 	latest_question_list = Question.objects.order_by('-pub_date')[:5]
# 	output = ', '.join([q.question_text for q in latest_question_list])
# 	output += "Hi there :)"
# 	template = loader.get_template('polls/index.html')
# 	context = {
# 		'latest_question_list': latest_question_list
# 	}
# 	# return HttpResponse(template.render(context,request))
# 	return render(request, 'polls/index.html', context)
#


def vote(request, question_id):
<<<<<<< HEAD
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))
=======
	question = get_object_or_404(Question, pk=question_id)
	try:
		selected_choice = question.choice_set.get(pk=request.POST['choice'])
	except (KeyError, Choice.DoesNotExist):
		# Redisplay the question voting form.
		return render(request, 'polls/detail.html', {
			'question': question,
			'error_message': "You didn't select a choice.",
		})
	else:
		selected_choice.votes += 1
		selected_choice.save()
		# Always return an HttpResponseRedirect after successfully dealing
		# with POST data. This prevents data from being posted twice if a
		# user hits the Back button.
		return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))
>>>>>>> 3bb0cd3da905fa9676cd51bfd60e9b4f52616be1

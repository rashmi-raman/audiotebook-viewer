Another implementation decision we needed to make involved rebuilding the web viewer. Initially, this was built on Java and was running on a local machine, but we wanted to make this available online as well. 

Hence, we decided to build this in simple HTML using the Backbone JS# framework. Backbone is a lightweight, javascript framework built especially to communicate with APIs and handle the lifecycle and display of these data objects. And Backbone was designed alongside the DocumentCloud# project - so another great framework designed by journalist-coders!

Our web viewer can be accessed from this link#, once again using Amazon’s S3 service to host a static website. 


The Web Viewer can be used to retrieve information and the archive created containing data from the reportage. It invokes the GET method of the API, retrieves the JSON, analyzes it and then displays it in a list format.

The archive file is also available in a downloadable format from this viewer. 

Watch the viewer in action : www.audiotebook.com

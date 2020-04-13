<%--
Copyright 2019 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
--%>

<%-- The Java code in this JSP file runs on the server when the user navigates
     to the homepage. This allows us to insert the Blobstore upload URL into the
     form without building the HTML using print statements in a servlet. --%>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreService" %>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreServiceFactory" %>
<% BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
   String uploadUrl = blobstoreService.createUploadUrl("/upload-handler"); %>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Code Editor File Upload</title>
  </head>
  <body>
    <h1>Upload the file you want to edit</h1>

    <form method="POST" enctype="multipart/form-data" action="<%= uploadUrl %>">
      <p>Upload a file:</p>
      <input type="file" name="f">
      <br/><br/>
      <button>Submit</button>
    </form>
  </body>
</html>
#!/bin/sh -x
set -e
ls -latr /usr/bin/gwtc
/usr/bin/gwtc ./docs --title Cloud_Aware_Application_Development_Environment --format all --footer ./design/_footer.html

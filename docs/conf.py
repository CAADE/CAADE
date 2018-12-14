from recommonmark.parser import CommonMarkParser

source_parsers = {
    '.md': CommonMarkParser,
}

project = u"Cloud Aware Application Development Ecosystem"
copyright = u"2018, Intel"
version = "0.5.0"

master_doc = 'index'
source_suffix = ['.rst', '.md']

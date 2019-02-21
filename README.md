# package-makefile-generator
Generator to help create OpenWRT package makefiles

## Initial Setup

This is a Node.JS project, run `npm install` to setup the required modules.

## Using the Generator

The generator uses the `Makefile.hbs` template and an input json file to create an OpenWRT package makefile.

See the included `sample.json` file for an example of what data is required. 
*Note that `dependencies` is the only key-value pair that is optional.*

## Running the Generator

Create your own input json file and run the generator like so:

```
node index.js --input <JSON file>
```

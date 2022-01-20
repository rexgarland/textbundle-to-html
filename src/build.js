#!/usr/bin/env node

import {program} from 'commander'
import path from 'path'

import bundle from './bundle.js'
import {sluggify} from './slug.js'

program
.arguments('<source>')
.option('-t, --template <template>', 'html template file, containing {{{markup}}}')
.option('-o, --output <output>', 'html file to output')
.action(function(source, options) {
	var outdir;
	if (options.output) {
		outdir = options.output
	} else {
		const {name, dir} = path.parse(source)
		outdir = path.join(dir, sluggify(name))
	}
	bundle(source, outdir, options.template)
})
.parse(process.argv);
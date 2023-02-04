---
title: 'MongoDB 4.4 Structured Logging & lnav'
pubDatetime: 2020-08-18T15:00:00Z
description: 'I use `lnav` pretty much every day to look at MongoDB logs. Now you can too.'
---

I've been using the `lnav` tool for parsing logs for a good long while now. Now that MongoDB 4.4 has structured logging, I took a shot at creating a formatting file for `lnav` so that it prints them out similarly to what I've been used to with the pre-4.4 logging style. While I didn't want to get too far away from the default formatting, there are some conveniences added that make looking at these logs a bit nicer than just using something like `less` or parsing them with `jq`.

After [some help from @tstack](https://github.com/tstack/lnav/issues/746) (the maintainer of `lnav`) I ended up with what you see below. Note that the second code block is for the pre-4.4 format, in case you still need to look at those (I do).

`mongod-post44.json`:

```json ins={5}
{
	"mongod_post44": {
		"title": "MongoDB 4.4 Log format",
		"description": "New log format beginning with MongoDB 4.4",
		"url": "https://docs.mongodb.com/manual/reference/log-messages/index.html#structured-logging",
		"json": true,
		"file-pattern": ".*mongod.*",
		"line-format": [
			"{ \"t\": { \"$date\": ",
			{ "field": "__timestamp__" },
			" }, \"s\": ",
			{ "field": "s", "min-width": 1, "align": "right" },
			", \"c\": ",
			{ "field": "c", "min-width": 7, "align": "right" },
			", \"id\": ",
			{ "field": "id", "min-width": 6, "align": "right" },
			", \"ctx\": ",
			{ "field": "ctx", "min-width": 9, "align": "right" },
			", \"msg\": ",
			{ "field": "msg" },
			", \"attr\": ",
			{ "field": "attr" }
		],
		"timestamp-field": "t/$date",
		"level-field": "s",
		"level": {
			"fatal": "F",
			"error": "E",
			"warning": "W",
			"info": "I",
			"debug": "D1",
			"debug2": "D2",
			"debug3": "D3",
			"debug4": "D4",
			"debug5": "D5"
		},
		"body-field": "msg",
		"value": {
			"t": { "kind": "string", "hidden": true },
			"t/$date": { "kind": "string" },
			"s": { "kind": "string" },
			"c": { "kind": "string" },
			"id": { "kind": "integer", "identifier": true },
			"ctx": { "kind": "string", "identifier": true },
			"msg": { "kind": "string" },
			"attr": { "kind": "json" }
		}
	}
}
```

`mongod-pre44.json`:

```json
{
	"mongod_pre44": {
		"title": "MongoDB server log format",
		"regex": {
			"main": {
				"pattern": "^(?<timestamp>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}[,\\.]\\d+\\+\\d+)\\s+(?<level>\\w)\\s+(?<component>\\w+|-)\\s+\\[?(?<context>-*[^\\0]+?)?\\]\\s+(?<body>[^\\0]*)$"
			}
		},
		"level": {
			"critical": "F",
			"debug": "D",
			"error": "E",
			"info": "I",
			"warning": "W"
		},
		"opid-field": "context",
		"value": {
			"context": {
				"kind": "string",
				"identifier": true
			},
			"component": {
				"kind": "string",
				"identifier": true
			},
			"body": {
				"kind": "string"
			}
		},
		"sample": [
			{
				"line": "2016-11-21T11:55:09.601+0000 I CONTROL  [initandlisten] MongoDB starting : pid=19972 port=27017 dbpath=/var/lib/mongodb 32-bit host=ubuntu-512mb-fra1-012"
			},
			{
				"line": "2016-12-24T05:05:49.136+0000 E NETWORK  [initandlisten] Failed to unlink socket file /tmp/mongodb-27017.sock errno:1 Operation not permitted"
			},
			{
				"line": "2019-10-30T17:01:47.736+0000 I INDEX [repl writer worker 0] building index using bulk method build may temporarily use up to 500 megabytes of RAM"
			}
		]
	}
}
```

These files would be put in the `$HOME/.lnav/formats/installed` folder. `lnav` has some [pretty good sampling logic](https://lnav.readthedocs.io/en/latest/formats.html#format-order-when-scanning-a-file) and shouldn't have any problem figuring out which formatting file to use when you open a file that matches the rules in those files. There are also plenty of other file formats that other folks have created if you don't need to look at MongoDB logs, but you _do_ want to use `lnav` located [here](https://github.com/tstack/lnav-config/blob/master/remote-config.json).

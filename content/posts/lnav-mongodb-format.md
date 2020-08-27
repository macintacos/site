+++
title = "MongoDB 4.4 Structured Logging & `lnav`"
date = "2020-08-18"
summary = "I use `lnav` pretty much every day to look at MongoDB logs. Now you can too."
+++

I've been using the `lnav` tool for parsing logs for a good long while now. Now that MongoDB 4.4 has structured logging, I took a shot at creating a formatting file for `lnav` so that it prints them out in a similar fashion that I've been used to with the pre-4.4 logging style. While I didn't want to get too far away from the default formatting, there are some conveniences added that make looking at these logs a bit nicer than just using something like `less` or parsing them with `jq`.

After [some help from @tstack](https://github.com/tstack/lnav/issues/746) (the maintainer of `lnav`) I ended up with what you see below. Note that the second code block is for the pre-4.4 format, in case you still need to look at those (I do):

{{< gist macintacos c6f58d2b0ed167b71466b20ec3fed7e7 >}}

These files would be put in the `$HOME/.lnav/formats/installed` folder. `lnav` has some [pretty good sampling logic](https://lnav.readthedocs.io/en/latest/formats.html#format-order-when-scanning-a-file) and shouldn't have any problem figuring out which formatting file to use when you open a file that matches the rules in those files. There are also plenty of other file formats that other folks have created if you don't need to look at MongoDB logs but you _do_ want to use `lnav` located [here](https://github.com/tstack/lnav-config/blob/master/remote-config.json).

Feel free to reach out [on Twitter](twitter.com/macintacos) if you have any questions. I hope to share more nuggets of information like this on this site when I have the chance.
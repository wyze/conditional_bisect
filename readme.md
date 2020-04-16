# conditional_bisect &middot; [![Build Status][actions-image]][actions-url]

> Modifies `bsconfig.json` to add settings for [bisect_ppx](//github.com/aantron/bisect_ppx).

## Usage

```sh
$ deno --allow-read --allow-write mod.ts
```

## Development

```sh
$ git clone https://github.com/wyze/conditional_bisect.git
$ cd conditional_bisect
```

## Test

```sh
$ deno test -A
```

## Change Log

> [Full Change Log](changelog.md)

### [v1.0.1](https://github.com/wyze/conditional_bisect/releases/tag/v1.0.1) (2020-04-16)

* Lock std to v0.40 ([@wyze](https://github.com/wyze) in [4823521](https://github.com/wyze/conditional_bisect/commit/4823521))

## License

MIT © [Neil Kistner](https://neilkistner.com)

[actions-image]: https://img.shields.io/github/workflow/status/wyze/conditional_bisect/CI.svg?style=flat-square
[actions-url]: https://github.com/wyze/conditional_bisect/actions

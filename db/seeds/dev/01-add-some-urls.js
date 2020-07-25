exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('urls')
        .truncate()
        .then(function () {
            // Inserts seed entries
            return knex('urls').insert([
                {
                    id: 1,
                    longUrl: 'https://www.peresola.com/',
                    shortUrl: 'abc12',
                },
                {
                    id: 2,
                    longUrl: 'https://www.google.com/',
                    shortUrl: 'qw12y',
                },
                {
                    id: 3,
                    longUrl: 'https://www.instagram.com/',
                    shortUrl: 'po678',
                },
            ]);
        });
};

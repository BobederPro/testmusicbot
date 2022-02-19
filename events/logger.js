const client = require("../index");
client.on("error", async (error) => {
  console.log(error);
});

client.on("rateLimit", async (ratelimit) => {
  console.log(JSON.stringify(ratelimit));
});

client.on("shardDisconnect", async (e, id) => {
  console.log(
    ` || <==> || [${String(new Date())
      .split(" ", 5)
       .join(" ")}] || <==> || Shard #${id} Verbindung getrennt || <==> ||`
  );
});

client.on("shardError", async (e, id) => {
  console.log(
    ` || <==> || [${String(new Date())
       .split(" ", 5)
       .join(" ")}] || <==> || Shard #${id} Fehler || <==> ||`
  );
});

client.on("shardReady", async (id) => {
  console.log(
    ` || <==> || [${String(new Date())
       .split(" ", 5)
      .join(" ")}] || <==> || Shard #${id} Bereit || <==> ||`
  );
});

client.on("shardReconnecting", async (id) => {
  console.log(
    ` || <==> || [${String(new Date())
      .split(" ", 5)
      .join(" ")}] || <==> || Shard #${id} neu verbinden || <==> ||`
  );
});

client.on("shardResume", async (id, e) => {
  console.log(
    ` || <==> || [${String(new Date())
       .split(" ", 5)
       .join(" ")}] || <==> || Shard #${id} fortgesetzet || <==> ||`
  );
});

client.on("warn", async (message) => {
  console.log(message.toString());
});
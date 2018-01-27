const { db, createTables, Table } = require('./models.js');

const getEmailsByThreadId = function(threadId) {
  return db
    .select('*')
    .from(Table.EMAIL)
    .where({
      threadId
    });
};

const getThreads = function(timestamp, limit, offset) {
  return db
    .select(
      `${Table.EMAIL}.*`,
      `${Table.EMAIL}.isMuted as allowNotifications`,
      db.raw(
        `group_concat(CASE WHEN ${Table.EMAIL_LABEL}.labelId <> 1 THEN ${
          Table.EMAIL_LABEL
        }.labelId ELSE NULL END) as labels`
      ),
      db.raw(`group_concat(distinct(${Table.EMAIL}.id)) as emails`)
    )
    .from(Table.EMAIL)
    .leftJoin(
      Table.EMAIL_LABEL,
      `${Table.EMAIL}.id`,
      `${Table.EMAIL_LABEL}.emailId`
    )
    .leftJoin(Table.LABEL, `${Table.EMAIL_LABEL}.labelId`, `${Table.LABEL}.id`)
    .where('date', '<', timestamp || 'now')
    .groupBy('threadId')
    .orderBy('date', 'DESC')
    .limit(limit || 20)
    .offset(offset || 0);
};

const simpleThreadsFilter = function(filter){
  return db
  .select(
    `${Table.EMAIL}.*`
  )
  .from(Table.EMAIL)
  .where('preview', 'like', `%${filter}%`)
  .orWhere('content', 'like', `%${filter}%`)
  .orWhere('subject', 'like', `%${filter}%`)
  .groupBy('threadId')
  .orderBy('date', 'DESC')
  .limit(5)
}

const getThreadsFilter = function(timestamp, params = {}, limit) {
  const {
    from,
    to,
    subject,
    text,
    hasAttachments,
    mailbox,
    plain
  } = params;

  let queryDb = baseThreadQuery(timestamp);
    
  if(plain){
    return simpleFilterQuery(queryDb, text);
  }

  if(text){
    queryDb = queryDb
    .andWhere('preview', 'like', `%${text}%`)
    .andWhere('content', 'like', `%${text}%`)
  }
  if(subject){
    queryDb = queryDb.andWhere('subject', 'like', `%${subject}%`)
  }

  if(mailbox && mailbox !== -1){
    queryDb = queryDb.andWhere('labelId', '=', mailbox)
  }

  return queryDb;
};

const baseThreadQuery = (timestamp, limit) => (db
  .select(
    `${Table.EMAIL}.*`,
    `${Table.EMAIL}.isMuted as allowNotifications`,
    db.raw(
      `group_concat(CASE WHEN ${Table.EMAIL_LABEL}.labelId <> 1 THEN ${
        Table.EMAIL_LABEL
      }.labelId ELSE NULL END) as labels`
    ),
    db.raw(`group_concat(distinct(${Table.EMAIL}.id)) as emails`)
  )
  .from(Table.EMAIL)
  .leftJoin(
    Table.EMAIL_LABEL,
    `${Table.EMAIL}.id`,
    `${Table.EMAIL_LABEL}.emailId`
  )
  .where('date', '<', timestamp || 'now')
  .groupBy('threadId')
  .orderBy('date', 'DESC')
  .limit(limit || 20)
)

const simpleFilterQuery = (query, filter) => (
  query.andWhere(function() {
    this
      .where('preview', 'like', `%${filter}%`)
      .orWhere('content', 'like', `%${filter}%`)
      .orWhere('subject', 'like', `%${filter}%`) 
  })
)

const getAllLabels = function() {
  return db.select('*').from(Table.LABEL);
};

const addEmail = function(params) {
  return db.table(Table.EMAIL).insert(params);
};

const markThreadAsRead = function(threadId) {
  return db
    .table(Table.EMAIL)
    .where({
      threadId
    })
    .update({
      unread: false
    });
};

const deleteEmail = function(emailKey) {
  return db
    .table(Table.EMAIL)
    .where({
      key: emailKey
    })
    .del();
};

const closeDB = function() {
  db.close();
  db.disconnect();
};

module.exports = {
  addEmail,
  createTables,
  closeDB,
  deleteEmail,
  getAllLabels,
  getEmailsByThreadId,
  getThreads,
  getThreadsFilter,
  markThreadAsRead,
  simpleThreadsFilter
};

declare module 'nact' {
  type ActorState<T> = T

  type ActorName = string

  type PersistenceKey = string

  type StatelessActorMessageHandlerFunction<Message> = (
    msg: Message,
    context: ActorContext
  ) => void

  type StatefulActorMessageHandlerFunction<State, Message> = (
    state: ActorState<State>,
    msg: Message,
    context: ActorContext
  ) => ActorState<State>

  type PersistenceActorMessageHandlerFunction<State, Message> = (
    state: ActorState<State>,
    msg: Message,
    context: PersistentActorContext<Message>
  ) => ActorState<State>

  interface ActorContext extends ActorRef {
    sender: ActorRef
  }

  interface ActorProperties {
    shutdownAfter?: number
  }

  interface ActorRef {
    parent: ActorRef
    path: string
    self: ActorRef
    name: ActorName
    children: Map<ActorName, ActorRef>
  }

  interface PersistentActorContext<Message> extends ActorContext {
    recovering: boolean
    persist(msg: Message): Promise<void>
  }

  interface PersistentActorProperties extends ActorProperties {
    snapshotEvery: number
    snapshotEncoder(snapshot: any): any
    snapshotDecoder(serialized: any): any
    encoder(msg: any): any
    decoder(serialized: any): any
  }

  interface StatefulActorProperties<State> extends ActorProperties {
    initialState?: ActorState<State>
    initialStateFunc?: (ctx: ActorContext) => ActorState<State>
  }

  /**
   * dispatch a message to actor
   *
   * @param actor
   *  recipient actor
   * @param msg
   *  message
   * @param sender
   *  sender actor
   */
  function dispatch(actor: ActorRef, msg: any, sender?: ActorRef): void

  /**
   * query
   *
   * @param actor
   *  recipient actor
   * @param msg
   *  message
   * @param timeout
   *  timeout(unit: ms, throws an Error if exceeded)
   */
  function query<Message = any, Response = any>(
    actor: ActorRef,
    msg: Message,
    timeout: number
  ): Promise<Response>

  /**
   * spawn an actor
   *
   * @param parent
   *   parent actor
   * @param f
   *   message handler function
   * @param name
   *   actor name
   * @param properties
   */
  function spawn<State = {}, Message = any>(
    parent: ActorRef,
    f: StatefulActorMessageHandlerFunction<State, Message>,
    name?: ActorName,
    properties?: StatefulActorProperties<State>
  ): ActorRef

  /**
   * spawn a persistent actor
   *
   * @param parent
   *   parent actor
   * @param f
   *   message handler function
   * @param persistenceKey
   *   Persistence key.
   *   If we want to restore actor state, the key must be the same.
   *   Be careful about namespacing here.
   *   For example if we'd just used userId, another developer might accidentally
   *   use the same key for an actor of a different type.
   *   This could cause difficult to debug runtime errors
   * @param name
   *   actor name
   * @param properties
   */
  function spawnPersistent<State = {}, Message = any>(
    parent: ActorRef,
    f: StatefulActorMessageHandlerFunction<State, Message>,
    persistenceKey: PersistenceKey,
    name?: ActorName,
    properties?: PersistentActorProperties
  ): ActorRef

  /**
   * spawn a stateless actor
   *
   * @param parent
   *   parent actor
   * @param f
   *   message handler function
   * @param name
   *   actor name
   * @param properties
   */
  function spawnStateless<Message = any>(
    parent: ActorRef,
    f: StatelessActorMessageHandlerFunction<Message>,
    name?: ActorName,
    properties?: ActorProperties
  ): ActorRef

  /**
   * start actor system
   */
  function start(): ActorRef

  /**
   * stop an actor
   */
  function stop(actor: ActorRef): void
}

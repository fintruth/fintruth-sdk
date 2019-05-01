declare module 'nact' {
  export interface ActorRef {
    parent: ActorRef
    path: string
    self: ActorRef
    name: ActorName
    children: Map<ActorName, ActorRef>
  }

  export interface ActorContext extends ActorRef {
    sender: ActorRef
  }

  export interface PersistentActorContext<Message> extends ActorContext {
    recovering: boolean
    persist(msg: Message): Promise<void>
  }

  export type ActorState<T> = T

  export type ActorName = string

  export type PersistenceKey = string

  export type StatelessActorMessageHandlerFunction<Message> = (
    msg: Message,
    context: ActorContext
  ) => void

  export type StatefulActorMessageHandlerFunction<State, Message> = (
    state: ActorState<State>,
    msg: Message,
    context: ActorContext
  ) => ActorState<State>

  export type PersistenceActorMessageHandlerFunction<State, Message> = (
    state: ActorState<State>,
    msg: Message,
    context: PersistentActorContext<Message>
  ) => ActorState<State>

  export interface ActorProperties {
    shutdownAfter: number
    initialState: any
  }

  export interface PersistentActorProperties extends ActorProperties {
    snapshotEvery: number
    snapshotEncoder(snapshot: any): any
    snapshotDecoder(serialized: any): any
    encoder(msg: any): any
    decoder(serialized: any): any
  }

  /**
   * start actor system
   */
  export function start(): ActorRef

  /**
   * stop an actor
   */
  export function stop(actor: ActorRef): void

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
  export function dispatch(actor: ActorRef, msg: any, sender?: ActorRef): void

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
  export function query<Message = any, Response = any>(
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
  export function spawn<State = {}, Message = any>(
    parent: ActorRef,
    f: StatefulActorMessageHandlerFunction<State, Message>,
    name?: ActorName,
    properties?: ActorProperties
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
  export function spawnStateless<Message = any>(
    parent: ActorRef,
    f: StatelessActorMessageHandlerFunction<Message>,
    name?: ActorName,
    properties?: ActorProperties
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
  export function spawnPersistent<State = {}, Message = any>(
    parent: ActorRef,
    f: StatefulActorMessageHandlerFunction<State, Message>,
    persistenceKey: PersistenceKey,
    name?: ActorName,
    properties?: PersistentActorProperties
  ): ActorRef
}

# Appsync-GraphQL-Service

## AWS AppSync:
<details>  
It's a fully managed GraphQL service that runs on AWS. It helps us build scalable applications that can connect to multiple data sources.

The GraphQL connects with those data sources via resolvers.
So GraphQL presents itself as a single endpoint and then behind a GraphQL server, we connect different data sources using resolvers.

Is also a foundational building block that allows us to build GraphQL APIs for real time applications that also require offline data access.

Many benefits of AppSync as well as being managed
We don't have to worry about servers or infrastructure to manage our service
 
Supported data-soruces: Amazon dynamo DB, AWS Lambda, and ElastiSearch.
Also with AppSync, it's a great ability to also connect to AWS services using its
inbuilt HTTP resolvers.

And finally, AppSync also provides large set  of enterprise security features that allow us to set up things
like multilevel authorization, access control.

And it also integrates with AWS WAF, X-Ray and Cloudwatch that provides the monitoring that we need
to actually track the performance of our API.
</details>

## API in Production

## Protecting access to the API: Authorization mode & Choosing the right mode
<details>  

Depending on the type of application we're building, it could be enterprise, it could be for a startup,
and who we want accessing our API, we may want to choose a different authorization mode for each of those use cases.

### API key - 
This mode allows us to simply specify a HTTP header.
This header is called X API key and specifies the value of an API key that we've set up.
This is fairly simple but efficient mode to use when we're getting started or for demo purposes

Also a useful and a good mode to use for business or machine to machine use cases.

### Cognito User Pools -
Cognito User Pools is a great tool to use if we have an application where users are signing
into the app with a user pool and then using JSON web tokens or JWT tokens
that they receive from the Cognito User Pool to get access to our API.

So it is a great mode to use if we have an authenticated user in an application, as an example, this mode is also good
if we need to connect social identities using cognito, which is a feature from Cognito User Pools

Also, if we go on to build an app that interacts with other AWS services,
Cognito User Pools is probably what we want to use, as we can exchange Cognito User Pool
for actual AWS credentials, which is very handy.

So if we have an application that's also going to interact with something like AWS, Amazon S3, then Cognito User Pool mode
is probably what we want to use because of visibility.

Additionally, with Cognito access mode, we can also implement granular access control using directives.

### Open ID connect or OIDC. -
So ideally, this is good when we have something like an application that already
is set up and has a user directory. So we might have an external OIDC identity provider and we can set that up.

There's one difference with Cognito User Pools and OIDC is Cognito User Pools
can actually be used to exchange AWS credentials. 
So this is not something that we would be able to implement
with OIDC and then the provider.

However, just like Cognito User Pool, weu can implement a very granular access control
using the claims that are available in the identity object that is made available
to our resolvers in AppSync.

### AWS Identity and Access Management: IAM.
This is a great mode to use if we have backends running on AWS that are going
to access our apps when we're using AWS credentials.

And even if we are using say IoT systems that are using AWS credentials,
we could then use AWS role, like at the end of the policy to sign our request
towards AWS AppSync, and AppSync will then validate that request and make sure we're authorized
to access the fields and types that we want to access.
And we can get very granular with the divisions here as well.

So this is the mode that recommended if we're accessing for an EC2 instance,
because they use instance profiles, or if we're using AWS Lambda function to access the API.  
</details>

## Protecting the availability of our API.
<details>  

So with AppSync, it provides DDoS protection for every API that we configure.
This means that it's built into standard attacks, sand can scale to absorb those attacks.

Additionally, it also integrates with **AWS WAF** to provide additional firewall rules,
types of functionality to protect our API against the most common threats,
like a cross-site scripting detection, sql injection, as examples.

Other usecases: 
- We can support B2B APIs using API keys
  and we can make sure that our different partners or third-party partners
  that have those keys do not overwhelm the actual API with requests.
- IP Whitelisting

</details>

## Performance and Monitoring
<details>  
To make sure we understand what's going on with the performance of our API
AppSync allows us to do that by providing CloudWatch metrics.
So by default, we can monitor:
- the latency of our API and we can also
- monitor the number of requests that are coming into our API,
- number of 400 errors and
- number of 500 errors.

</br><img src="https://readme-assets-serverless-backend-service.s3.eu-west-1.amazonaws.com/api-metrics.png" width = "100%" height="100%"/></p>

AppSync also integrates with CloudWatch logs. So this allows us to use these logs
to actually gain further insight into what's going on with our API.
So with CloudWatch logs, we can do two things.
We can log insights, do some query of our logs to figure out what's going on.

For example,
We can look at the logs to understand the latency that our different fields and resolvers are experiencing.
And if we find that insightful, we can then choose to create metric filters, 
to create specific latency metrics for fields that we want to monitor closely.

Now, once we've created those metrics, we can also serve a line against them
so we can be notified if some if our field resolvers are taking more than expected
to resolve requests as an example.
And then based on those alarms, we can may be choose to take different action.
Maybe we want to introduce something like a cache or maybe there's some fine tuning that we need to perform
for our resolvers to improve their performance.

That's monitoring and how we can use it to improve our API.

But sometimes we also need to talk to some real time
tracing all of those APIs to find out what's going on.
We can do that with **AWS X-Ray**, We we can use it to identify performance bottlenecks,
and we can see which components are actually contributing the most latency.

**AWS X-Ray**

</br><img src="https://readme-assets-serverless-backend-service.s3.eu-west-1.amazonaws.com/x-ray/x-ray.png" width = "100%" height="100%"/></p>

Tracing errors with X-Ray:
Different from REST, GraphQL returns HTTP 200 responses whether parts of a query succeeded or not at all, and the client has to detect if errors are sent as part of the response. That means, if we made a mistake when creating a malformed custom resolver, or if one of our data sources returned errors we can pinpoint exactly the culprit.

</br><img src="https://readme-assets-serverless-backend-service.s3.eu-west-1.amazonaws.com/x-ray/trace-errors-when-multiple-data-sources.png" width = "100%" height="100%"/></p>

</details>

## Caching

<details>  

With the help of monitoring finally  we can fine tune or optimize out our API with something like a cache.

AppSync does provide a cache that sits between our API and our backend resources.

So if we want to do a situation where we want to provide faster response times for some of those requests,
We can introduce this cache, it is fully managed.

We could set it up for full API caching, and at that point, all quests will be cached.
So providing them millisecond type of response time for all of our requests, or
We can set up a per resolver cache.
It may have some resolvers that we do not want to cache as the data changes rapidly,
but we may also have resolvers that that does not change that much.
Maybe it's a read heavy system.

Finally, we can turn on encryption as well to protect our data both
at rest and in transit in cache.

To deploy our AWS AppSync instance and the various other services will enable us to improve the security, observability and
monitoring and performance of our GraphQL API in production.


</br><img src="https://readme-assets-serverless-backend-service.s3.eu-west-1.amazonaws.com/cache/x-ray-cache.png" width = "100%" height="100%"/></p>


</details>

## Archtitecture  
</br><img src="https://readme-assets-serverless-backend-service.s3.eu-west-1.amazonaws.com/service-architecture.png" width = "100%" height="100%"/></p>


## Services
- Github: Source code
- AWS CloudFormation: Backend Infrastructure as IAC
- AWS CodePipeline: Orchestration (Code: Source to Deployment)
- AWS CodeBuild: Deployment (Serverless framework: sls deploy)
- AWS Appsync: GraphQL

## Folder Structure 📁
The repository follows clean architecture with source code.

```
├── infrastructure                    IaC code for the project like deployment, bundle, ci/cd etc
│   ├── cloudformation
├── jest                              Project level jest setup
├── src
│   ├── adapters                      contains functions whose sole task is to convert data from one form to another provided inputs are valid. Example - from database schema to frontend one or vice versa
│   ├── constants                     contains all constants
│   ├── deliveries                    contains interfaces for how other services will interact with it
│   ├── errors                        custom errors extends generic error
│   ├── repositories                  contains functions that allow us to interact with data store related to the entity
│   ├── services                      contains utils that connect to other services like logging 
│   ├── usecases                      contains main business logic for each API resides here. An API calls starts from deliveries, then goes to adapters which validate and parse data and finally reaches usecases which where all the processing takes place and they are the one's interacting with db repsoitories
└── tests                             tests in different folders instead of tests being written with the files to prevent cluttering
    └── mock-data
```

## Examples

For examples on how to consume these CRUD GraphlQL APIs, refer examples under appsync directory in the root

## Tests

Setup for Unit Tests is done via Jest and a sample unit test have been added with coverage support

#### Running tests
```
yarn run test
```